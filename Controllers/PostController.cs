using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Microsoft.EntityFrameworkCore;
using Tabloid.Models;

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
        .Include(p => p.PostTags)
        .ThenInclude(pt => pt.Tag)
        .Where(p => p.PublishDateTime != null && p.IsApproved == true)
        .OrderByDescending(p => p.PublishDateTime));
    }

    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetById(int id)
    {
        return Ok(_dbContext.Posts
        .Include(p => p.Category)
        .Include(p => p.UserProfile)
        .SingleOrDefault(p => p.Id == id));
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
}