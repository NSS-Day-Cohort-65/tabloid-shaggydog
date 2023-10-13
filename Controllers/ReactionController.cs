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

    [HttpGet("postreaction/{id}")]
    [Authorize]
    public IActionResult GetPostReactionById(int id)
    {
        PostReaction postReaction = _dbContext.PostReactions.SingleOrDefault(pr => pr.Id == id);
        if (postReaction != null)
        {
            return Ok(postReaction);
        }

        return NotFound();
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

    [HttpPost("postreact")]
    [Authorize]
    public IActionResult CreatePostReaction(PostReaction postReaction)
    {
        try
        {
            _dbContext.PostReactions.Add(postReaction);
            _dbContext.SaveChanges();
            return Created($"api/reaction/postreaction/{postReaction.Id}", postReaction);
        }
        catch (DbUpdateException)
        {
            return BadRequest();
        }
    }

    [HttpDelete("postreaction/{postId}/{reactionId}/{userId}")]
    [Authorize]
    public IActionResult DeletePostReaction(int postId, int reactionId, int userId)
    {
        PostReaction postReaction = _dbContext.PostReactions
            .Where(pr => pr.UserProfileId == userId && pr.ReactionId == reactionId)
            .SingleOrDefault(pr => pr.PostId == postId);

        if (postReaction != null)
        {
            _dbContext.PostReactions.Remove(postReaction);
            _dbContext.SaveChanges();
            return NoContent();
        }

        return NotFound();
    }
}