using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class CommentController : ControllerBase
{
    private TabloidDbContext _dbContext;
    public CommentController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Comments
            .Include(c => c.Post)
            .Include(c => c.UserProfile)
            .OrderByDescending(c => c.CreateDateTime));
    }

    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetById(int id)
    {
        Comment comment = _dbContext.Comments
            .Include(c => c.Post)
            .Include(c => c.UserProfile)
            .SingleOrDefault(c => c.Id == id);

        if (comment == null)
        {
            return NotFound();
        }
        if (comment.Id != id)
        {
            return BadRequest();
        }

        return Ok(comment);
    }

    [HttpGet("post/{postId}")]
    // [Authorize]
    public IActionResult GetByPostId(int postId)
    {
        try
        {
            return Ok(_dbContext.Comments
                .Include(c => c.UserProfile)
                .Where(c => c.PostId == postId)
                .OrderByDescending(c => c.CreateDateTime)
                .ToList());
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpDelete("{commentId}")]
    //[Authorize]
    public IActionResult Delete(int commentId)
    {
        //find comment to delete
        Comment CommentToDelete = _dbContext.Comments.FirstOrDefault(c => c.Id == commentId);
        if (CommentToDelete != null)
        {
            _dbContext.Comments.Remove(CommentToDelete);
            _dbContext.SaveChanges();
            return NoContent();
        }
        return NotFound();
    }

    [HttpPost]
    [Authorize]
    public IActionResult CreateComment(Comment comment)
    {
        try
        {
            comment.Post = _dbContext.Posts.SingleOrDefault(p => p.Id == comment.PostId);
            comment.UserProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == comment.UserProfileId);
            comment.CreateDateTime = DateTime.Now;

            _dbContext.Comments.Add(comment);
            _dbContext.SaveChanges();
            return Created($"api/comment/{comment.Id}", comment);
        }
        catch (DbUpdateException)
        {
            return BadRequest();
        }
    }

    //put to a comment
    [HttpPut("{commentId}")]
    public IActionResult editComment(int commentId, Comment updatedComment)
    {
        //find the comment to update.
        var commentToChange = _dbContext.Comments.SingleOrDefault(c => c.Id == commentId);

        if (commentToChange != null)
        // if not null then update
        {
            commentToChange.Content = updatedComment.Content;
            commentToChange.Subject = updatedComment.Subject;
            _dbContext.SaveChanges();
            return NoContent();
        }
        // if null return not found
        return NotFound();
    }
}