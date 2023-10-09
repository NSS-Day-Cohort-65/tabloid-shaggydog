

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    [HttpPost]
    // [Authorize(Roles = "Admin")]
    public IActionResult CreateCategory(Category category)
    {
        try 
        {
            _dbContext.Categories.Add(category);
            _dbContext.SaveChanges();
            return Created($"api/category/{category.Id}", category);
        }
        catch(DbUpdateException)
        {
            return NotFound();
        }
    }

    [HttpPut("{id}")]
    // [Authorize(Roles = "Admin")]
    public IActionResult EditCategory(int id, Category category)
    {
        Category matchingCategory = _dbContext.Categories.SingleOrDefault(c => c.Id == id);
        if (matchingCategory == null)
        {
            return NotFound();
        }
        if (category.Id == id)
        {
            return BadRequest();
        }

        matchingCategory.Name = category.Name;
        _dbContext.SaveChanges();
        return NoContent();
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

        _dbContext.Posts
            .Where(p => p.CategoryId == categoryToDelete.Id).ToList()
            .ForEach(p => p.CategoryId = null);

        _dbContext.SaveChanges();
        return NoContent();
    }

}