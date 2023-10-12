using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;

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
}