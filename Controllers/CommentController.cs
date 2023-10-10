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
}