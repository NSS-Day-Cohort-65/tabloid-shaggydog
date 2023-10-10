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

    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetById(int id)
    {
        Tag tag = _dbContext.Tags.SingleOrDefault(t => t.Id == id);
        if (tag == null)
        {
            return NotFound();
        }

        return Ok(tag);
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

    [HttpPut("{id}")]
    // [Authorize(Roles = "Admin")]
    public IActionResult EditTag(int id, Tag tag)
    {
        Tag matchingTag = _dbContext.Tags.SingleOrDefault(t => t.Id == id);
        if (matchingTag == null)
        {
            return NotFound();
        }
        if (tag.Id != id)
        {
            return BadRequest();
        }

        matchingTag.Name = tag.Name;
        _dbContext.SaveChanges();
        return NoContent();
    }
}