using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Microsoft.EntityFrameworkCore;
using Tabloid.Models;

namespace Tabloid.Controllers;

[ApiController]
[Route ("/api/[controller]")]
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
        .Where(p => p.PublishDateTime != null && p.IsApproved == true)
        .OrderByDescending(p => p.PublishDateTime));
    }
}