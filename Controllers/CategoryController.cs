

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]

public class CategoryController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public CategoryController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Categories);
    }

    [HttpDelete("{id}")]
    // [Authorize(Roles = "Admin")]
    public IActionResult DeleteCategory(int id)
    {
        Category categoryToDelete = _dbContext.Categories.SingleOrDefault(c => c.Id == id);

        if (categoryToDelete == null)
        {
            return NotFound();
        }

        _dbContext.Categories.Remove(categoryToDelete);
        _dbContext.SaveChanges();
        return NoContent();
    }

}