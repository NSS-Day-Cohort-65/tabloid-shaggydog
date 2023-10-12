using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ReactionController : ControllerBase
{
    private TabloidDbContext _dbContext;
    public ReactionController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Reactions);
    }

    [HttpPost]
    [Authorize]
    public IActionResult CreateReaction(Reaction reaction)
    {
        try
        {
            _dbContext.Reactions.Add(reaction);
            _dbContext.SaveChanges();
            return Created($"api/reaction/{reaction.Id}", reaction);
        }
        catch (DbUpdateException)
        {
            return BadRequest();
        }
    }
}