using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]

public class TagController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public TagController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Tags
        .OrderBy(t => t.Name));
    }

    [HttpPost]
    // [Authorize(Roles = "Admin")]
    public IActionResult CreateTag(Tag tag)
    {
        try
        {
            _dbContext.Tags.Add(tag);
            _dbContext.SaveChanges();
            return Created($"api/tag/{tag.Id}", tag);
        }
        catch (DbUpdateException)
        {
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult DeleteTag(int id)
    {
        Tag tagToDelete = _dbContext.Tags.SingleOrDefault(t => t.Id == id);

        if (tagToDelete == null)
        {
            return NotFound();
        }

        _dbContext.Tags.Remove(tagToDelete);

        _dbContext.SaveChanges();
        return NoContent();
    }
}