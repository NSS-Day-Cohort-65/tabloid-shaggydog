using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class SubscriptionController : ControllerBase
{
    private TabloidDbContext _dbContext;
    public SubscriptionController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Subscriptions
            .Include(s => s.SubscriberUserProfile)
            .Include(s => s.ProviderUserProfile)
            .OrderByDescending(s => s.BeginDateTime));
    }

    [HttpGet("user/{userId}")]
    [Authorize]
    public IActionResult GetByUserId(int userId)
    {
        UserProfile userProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == userId);
        if (userProfile != null) 
        {
            return Ok(_dbContext.Subscriptions
                .Include(s => s.SubscriberUserProfile)
                .Include(s => s.ProviderUserProfile)
                .Where(s => s.SubscriberUserProfileId == userId));
        }

        return NotFound();
    }

    [HttpPost]
    [Authorize]
    public IActionResult CreateSubscription(Subscription subscription)
    {
        /* subscription.SubscriberUserProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == subscription.SubscriberUserProfileId);
        subscription.ProviderUserProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == subscription.ProviderUserProfileId); */
        subscription.BeginDateTime = DateTime.Now;
        
        _dbContext.Subscriptions.Add(subscription);
        _dbContext.SaveChanges();
        return Created($"api/subscriptions/{subscription.Id}", subscription);
    }
}