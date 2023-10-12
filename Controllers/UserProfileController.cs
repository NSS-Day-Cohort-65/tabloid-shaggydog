using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Tabloid.Controllers;


[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public UserProfileController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.UserProfiles.ToList());
    }

    [HttpGet("withroles")]
    // [Authorize(Roles = "Admin")]
    public IActionResult GetWithRoles()
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            CreateDateTime = up.CreateDateTime,
            LastName = up.LastName,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId,
            ImageLocation = up.ImageLocation,
            IsActive = up.IsActive,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        }).OrderBy(up => up.UserName).ToList());
    }

    [HttpGet("deactivated")]
    // [Authorize(Roles = "Admin")]
    public IActionResult GetDeactivated()
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            CreateDateTime = up.CreateDateTime,
            LastName = up.LastName,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId,
            ImageLocation = up.ImageLocation,
            IsActive = up.IsActive,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        }).Where(up => up.IsActive == false).ToList());
    }

    [HttpPost("promote/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Promote(string id)
    {
        IdentityRole role = _dbContext.Roles.SingleOrDefault(r => r.Name == "Admin");
        _dbContext.UserRoles.Add(new IdentityUserRole<string>
        {
            RoleId = role.Id,
            UserId = id
        });
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost("demote/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Demote(string id)
    {
        IdentityRole role = _dbContext.Roles
            .SingleOrDefault(r => r.Name == "Admin");

        IdentityUserRole<string> userRole = _dbContext
            .UserRoles
            .SingleOrDefault(ur =>
                ur.RoleId == role.Id &&
                ur.UserId == id);

        _dbContext.UserRoles.Remove(userRole);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [Authorize]
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        UserProfile user = _dbContext
            .UserProfiles
            .Include(up => up.IdentityUser)
            .SingleOrDefault(up => up.Id == id);

        if (user == null)
        {
            return NotFound();
        }
        user.Email = user.IdentityUser.Email;
        user.UserName = user.IdentityUser.UserName;
        return Ok(user);
    }
    [HttpGet("withroles/{id}")]
    // [Authorize(Roles = "Admin")]
    public IActionResult GetWithByIDRoles(int id)
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            CreateDateTime = up.CreateDateTime,
            LastName = up.LastName,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId,
            ImageLocation = up.ImageLocation,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        }).SingleOrDefault(up => up.Id == id));
    }

    [HttpPut("{id}")]
    // [Authorize(Roles = "Admin")]
    public IActionResult EditUserProfile(UserProfile userProfile)
    {
        UserProfile matching = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == userProfile.Id);
        matching.FirstName = userProfile.FirstName;
        matching.LastName = userProfile.LastName;
        matching.Email = userProfile.Email;
        matching.UserName = userProfile.UserName;
        _dbContext.SaveChanges();
        return NoContent();
    }
    [Authorize(Roles = "Admin")]
    [HttpPut("deactivate/{id}")]
    public IActionResult DeactivateUser(int id)
    {
        UserProfile userToUpdate = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == id);
        if (userToUpdate == null)
        {
            return NotFound();
        }

        userToUpdate.IsActive = false;
        _dbContext.SaveChanges();
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("activate/{id}")]
    public IActionResult ActivateUser(int id)
    {
        UserProfile userToUpdate = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == id);
        if (userToUpdate == null)
        {
            return NotFound();
        }

        userToUpdate.IsActive = true;
        _dbContext.SaveChanges();
        return NoContent();
    }
}