using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Microsoft.EntityFrameworkCore;
using Tabloid.Models;
using Tabloid.Models.DTOs;

namespace Tabloid.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class PostController : ControllerBase
{
    private TabloidDbContext _dbContext;
    public PostController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    //get approved posts & past publication, order by most recent, include category & userprofile
    [HttpGet]
    //[Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Posts
        .Include(p => p.Category)
        .Include(p => p.UserProfile)
        .Include(p => p.PostReactions)
        .Include(p => p.PostTags)
        .ThenInclude(pt => pt.Tag)
        .Where(p => p.PublishDateTime != null && p.IsApproved == true)
        .OrderByDescending(p => p.PublishDateTime));
    }

    [HttpGet("unapproved")]
    //[Authorize]
    public IActionResult GetUnapproved()
    {
        return Ok(_dbContext.Posts
        .Include(p => p.Category)
        .Include(p => p.UserProfile)
        .Include(p => p.PostTags)
        .ThenInclude(pt => pt.Tag)
        .Where(p => p.PublishDateTime != null && p.IsApproved == false)
        .OrderByDescending(p => p.PublishDateTime));
    }

    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetById(int id)
    {
        Post post = _dbContext.Posts
            .Include(p => p.Category)
            .Include(p => p.UserProfile)
            .Include(p => p.PostTags)
            .ThenInclude(pt => pt.Tag)
            .Include(p => p.PostReactions)
            .ThenInclude(pr => pr.Reaction)
            .Include(p => p.PostReactions)
            .ThenInclude(pr => pr.UserProfile)
            .SingleOrDefault(p => p.Id == id);

        if (post == null)
        {
            return NotFound();
        }

        post.PostReactionDTOs = post
            .PostReactions
            .GroupBy(pr => pr.Reaction)
            .Select(grp => new PostReactionDTO
            {
                Name = grp.Key.Name,
                ImageLocation = grp.Key.ImageLocation,
                Count = grp.Count(),
                ReactedByCurrentUser = grp.Any(pr => pr.UserProfileId == post.UserProfileId),
                Reaction = grp.Key
            }).ToList();

        return Ok(post);
    }

    //delete a post
    [HttpDelete("{postId}")]
    public IActionResult DeletePost(int postId)
    {
        //find the post to delete.
        var postToDelete = _dbContext.Posts.SingleOrDefault(p => p.Id == postId);
        if (postToDelete != null)
        {

            _dbContext.Posts.Remove(postToDelete);
            _dbContext.SaveChanges();
            return NoContent();
        }
        return NotFound();

    }

    //create a post
    [HttpPost]
    //[Authorize]
    public IActionResult PostPost(Post post)
    {
        post.CreateDateTime = DateTime.Now;
        post.PublishDateTime = DateTime.Now;
        post.IsApproved = post.IsApproved;
        post.UserProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == post.UserProfileId);
        _dbContext.Posts.Add(post);
        _dbContext.SaveChanges();
        return Created($"api/post/{post.Id}", post);
    }


    [HttpPut("{id}/edit")]
    // [Authorize]
    public IActionResult PutPost(int id, Post post)
    {
        Post foundPost = _dbContext.Posts.SingleOrDefault(p => p.Id == id);
        if (foundPost == null)
        {
            return NotFound();
        }
        if (id != post.Id)
        {
            return BadRequest();
        }

        foundPost.Title = post.Title;
        foundPost.Content = post.Content;
        foundPost.ImageLocation = post.ImageLocation;
        foundPost.CategoryId = post.CategoryId;
        foundPost.IsApproved = post.IsApproved;
        foundPost.UserProfileId = post.UserProfileId;
        _dbContext.SaveChanges();
        return NoContent();
    }
    //approve a post
    [HttpPut("approve/{id}")]
    public IActionResult approvePost(int id)
    {
        //find the post to approve from the id
        Post postToApprove = _dbContext.Posts.SingleOrDefault((p) => p.Id == id);
        if (postToApprove != null)
        {
            postToApprove.IsApproved = true;
            _dbContext.SaveChanges();
            return NoContent();
        }
        return NotFound();
    }

    //unapprove a post
    [HttpPut("unapprove/{id}")]
    public IActionResult unApprovePost(int id)
    {
        //find the post to approve from the id
        Post postToUnApprove = _dbContext.Posts.SingleOrDefault((p) => p.Id == id);
        if (postToUnApprove != null)
        {
            postToUnApprove.IsApproved = false;
            _dbContext.SaveChanges();
            return NoContent();
        }
        return NotFound();

    }
}