using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PostTagController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public PostTagController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    // [Authorize(Roles = "Admin")]
    public IActionResult CreatePostTag(PostTag postTag)
    {
        try
        {
            _dbContext.PostTags.Add(postTag);
            _dbContext.SaveChanges();
            return Created($"api/postTag/{postTag.Id}", postTag);
        }
        catch (DbUpdateException)
        {
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    // [Authorize]
    public IActionResult DeletePostTag(int id)
    {
        PostTag foundPostTag = _dbContext.PostTags.SingleOrDefault(pt => pt.Id == id);
        if (foundPostTag == null)
        {
            return NotFound();
        }
        _dbContext.PostTags.Remove(foundPostTag);
        _dbContext.SaveChanges();
        return NoContent();
    }
}