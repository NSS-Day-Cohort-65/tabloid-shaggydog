using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Tabloid.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

namespace Tabloid.Data;
public class TabloidDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;

    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Reaction> Reactions { get; set; }
    public DbSet<PostReaction> PostReactions { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<PostTag> PostTags { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Subscription> Subscriptions { get; set; }

    public TabloidDbContext(DbContextOptions<TabloidDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser[]
        {
            new IdentityUser
            {
                Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                UserName = "Administrator",
                Email = "admina@strator.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                UserName = "JohnDoe",
                Email = "john@doe.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "a7d21fac-3b21-454a-a747-075f072d0cf3",
                UserName = "JaneSmith",
                Email = "jane@smith.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                UserName = "AliceJohnson",
                Email = "alice@johnson.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                UserName = "BobWilliams",
                Email = "bob@williams.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                UserName = "EveDavis",
                Email = "Eve@Davis.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },

        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>[]
        {
            new IdentityUserRole<string>
            {
                RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
            },
            new IdentityUserRole<string>
            {
                RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                UserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df"
            },
            new IdentityUserRole<string>
            {
                RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                UserId = "a7d21fac-3b21-454a-a747-075f072d0cf3"
            }

        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile[]
        {
            new UserProfile
            {
                Id = 1,
                IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                FirstName = "Admina",
                LastName = "Strator",
                ImageLocation = "https://robohash.org/numquamutut.png?size=150x150&set=set1",
                CreateDateTime = new DateTime(2022, 1, 25),
                IsActive = true
            },
             new UserProfile
            {
                Id = 2,
                FirstName = "John",
                LastName = "Doe",
                CreateDateTime = new DateTime(2023, 2, 2),
                ImageLocation = "https://robohash.org/nisiautemet.png?size=150x150&set=set1",
                IdentityUserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                IsActive = true
            },
            new UserProfile
            {
                Id = 3,
                FirstName = "Jane",
                LastName = "Smith",
                CreateDateTime = new DateTime(2022, 3, 15),
                ImageLocation = "https://robohash.org/molestiaemagnamet.png?size=150x150&set=set1",
                IdentityUserId = "a7d21fac-3b21-454a-a747-075f072d0cf3",
                IsActive = true
            },
            new UserProfile
            {
                Id = 4,
                FirstName = "Alice",
                LastName = "Johnson",
                CreateDateTime = new DateTime(2023, 6, 10),
                ImageLocation = "https://robohash.org/deseruntutipsum.png?size=150x150&set=set1",
                IdentityUserId = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                IsActive = true
            },
            new UserProfile
            {
                Id = 5,
                FirstName = "Bob",
                LastName = "Williams",
                CreateDateTime = new DateTime(2023, 5, 15),
                ImageLocation = "https://robohash.org/quiundedignissimos.png?size=150x150&set=set1",
                IdentityUserId = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                IsActive = true
            },
            new UserProfile
            {
                Id = 6,
                FirstName = "Eve",
                LastName = "Davis",
                CreateDateTime = new DateTime(2022, 10, 18),
                ImageLocation = "https://robohash.org/hicnihilipsa.png?size=150x150&set=set1",
                IdentityUserId = "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                IsActive = true
            }
        });

        modelBuilder.Entity<Category>().HasData(new Category[]
        {
            new Category {Id = 1, Name = "Science"},
            new Category {Id = 2, Name = "Comedy"},
            new Category {Id = 3, Name = "Food"},
            new Category {Id = 4, Name = "Community"},
            new Category {Id = 5, Name = "Technology"}
        });

        modelBuilder.Entity<Reaction>().HasData(new Reaction[]
        {
            new Reaction {Id = 1, Name = "Like", ImageLocation = "https://www.svgrepo.com/show/449925/thumbs-up.svg" },
            new Reaction {Id = 2, Name = "Dislike", ImageLocation ="https://www.svgrepo.com/show/449926/thumbs-down.svg"},
            new Reaction {Id = 3, Name = "Love", ImageLocation ="https://www.svgrepo.com/show/343415/in-love-emoji-emoticon-feeling-face-smile.svg"},
            new Reaction {Id = 4, Name = "Laugh", ImageLocation ="https://www.svgrepo.com/show/492553/laugh-and-cry.svg"},
            new Reaction {Id = 5, Name = "Hate", ImageLocation ="https://www.svgrepo.com/show/404720/angry-face.svg"},
            new Reaction {Id = 6, Name = "Crying", ImageLocation ="https://www.svgrepo.com/show/405163/crying-face.svg"},
            new Reaction {Id = 7, Name = "Wow", ImageLocation ="https://www.svgrepo.com/show/303213/facebook-wow-logo.svg"}
        });

        modelBuilder.Entity<Tag>().HasData(new Tag[]
        {
            new Tag {Id = 1, Name = "#Spicy"},
            new Tag {Id = 2, Name = "#Hipster"},
            new Tag {Id = 3, Name = "#Coffee"},
            new Tag {Id = 4, Name = "#Cozy"},
            new Tag {Id = 5, Name = "#Cute"},
            new Tag {Id = 6, Name = "#Zesty"},
            new Tag {Id = 7, Name = "#Lit"},
            new Tag {Id = 8, Name = "#Slay"},
        });

        modelBuilder.Entity<PostReaction>().HasData(new PostReaction[]
        {
            new PostReaction { Id = 1, PostId = 1, ReactionId = 1, UserProfileId = 1},
            new PostReaction { Id = 2, PostId = 2, ReactionId = 2, UserProfileId = 2},
            new PostReaction { Id = 3, PostId = 2, ReactionId = 4, UserProfileId = 3},
            new PostReaction { Id = 4, PostId = 1, ReactionId = 3, UserProfileId = 2},
            new PostReaction { Id = 5, PostId = 1, ReactionId = 6, UserProfileId = 3},
            new PostReaction { Id = 6, PostId = 2, ReactionId = 6, UserProfileId = 1},
            new PostReaction { Id = 7, PostId = 3, ReactionId = 6, UserProfileId = 2},
            new PostReaction { Id = 8, PostId = 4, ReactionId = 6, UserProfileId = 1},
            new PostReaction { Id = 9, PostId = 4, ReactionId = 3, UserProfileId = 2},
            new PostReaction { Id = 10, PostId = 3, ReactionId = 5, UserProfileId =4},
            new PostReaction { Id = 11, PostId = 2, ReactionId = 6, UserProfileId =5},
            new PostReaction { Id = 12, PostId = 1, ReactionId = 7, UserProfileId =6},

        });

        modelBuilder.Entity<Comment>().HasData(new Comment[]
        {
            new Comment {
                Id = 1,
                PostId = 1,
                UserProfileId = 1,
                Subject = "Coffee",
                Content = "I love Mocha",
                CreateDateTime = new DateTime(2023,10,9,11,41,0)},
            new Comment {
                Id = 2,
                PostId = 2,
                UserProfileId = 3,
                Subject = "Zest",
                Content = "Keepin it Zesty",
                CreateDateTime = new DateTime(2023,10,9,11,30,0)},
             new Comment {
                Id = 3,
                PostId = 3,
                UserProfileId = 2,
                Subject = "DOGGY!",
                Content = "Did dog go poo poo?",
                CreateDateTime = new DateTime(2023,10,9,11,24,0)},
            new Comment {
                Id = 4,
                PostId = 4,
                UserProfileId = 2,
                Subject = "OOGA BOOGA",
                Content = "MONKEY MONKEY RAN",
                CreateDateTime = new DateTime(2023,10,9,11,5,0)},
        });

        modelBuilder.Entity<Subscription>().HasData(new Subscription[]
        {
            new Subscription { Id = 1, SubscriberUserProfileId = 1, ProviderUserProfileId =2, BeginDateTime = new DateTime(2023,10,7)},
            new Subscription { Id = 2, SubscriberUserProfileId = 2, ProviderUserProfileId =1, BeginDateTime = new DateTime(2023,10,7)},
            new Subscription { Id = 3, SubscriberUserProfileId = 3, ProviderUserProfileId =4, BeginDateTime = new DateTime(2023,10,7)},
            new Subscription { Id = 4, SubscriberUserProfileId = 4, ProviderUserProfileId =1, BeginDateTime = new DateTime(2023,10,7)}
        });

        modelBuilder.Entity<PostTag>().HasData(new PostTag[]
        {
            new PostTag { Id =1, PostId =1, TagId =1},
            new PostTag { Id =2, PostId =2, TagId =2},
            new PostTag { Id =3, PostId =3, TagId =3},
            new PostTag { Id =4, PostId =4, TagId =4},
            new PostTag { Id =5, PostId =1, TagId =2},
            new PostTag { Id =6, PostId =2, TagId =3},
            new PostTag { Id =7, PostId =3, TagId =4},
        });

        modelBuilder.Entity<Post>().HasData(new Post[]
        {
            new Post {
            Id = 1,
            Title = "Pumpkin Spice Season!",
            Content ="OMG, it's officially pumpkin spice latte season, babes! 🎃☕️ Fall vibes are in the air, and I couldn't be more pumped! Grab your coziest sweater, slip on those knee-high boots, and let's embrace the basic life together! 💁‍♀️🍂 Pumpkin spice and everything nice, amirite? 🧡 #PSL #FallVibes #BasicAndProud",
            ImageLocation = "https://chocolatecoveredkatie.com/wp-content/uploads/2023/08/Pumpkin-Spice-Latte-Recipe-jpg.webp",
            CreateDateTime = new DateTime(2023, 01, 01),
            PublishDateTime = new DateTime(2023, 01, 02),
            IsApproved = true,
            CategoryId = 1,
            UserProfileId =1,
            },

            new Post {
            Id = 2,
            Title = "Meet My Furry BFF: Mr. Fluffykins the Golden Doodle! 🐾💕",
            Content ="Just welcomed the newest member of the fam into my life, and I'm OBSESSED! Meet Mr. Fluffykins, my adorable golden doodle puppy! 🐶💕 He's basically a teddy bear come to life, and I can't handle the cuteness. Get ready for all the puppy spam, folks! 📸✨ #GoldenDoodleLove #PuppyParent #FurBaby", ImageLocation = "https://www.happygodoodle.com/wp-content/uploads/2022/07/apricot-goldendoodle-cuddled-in-womans-arms-puppy-socialization-good-breeder-dp.jpg",
            CreateDateTime = new DateTime(2023, 01, 03), PublishDateTime = new DateTime(2023, 01, 04),
            IsApproved = true,
            CategoryId = 2,
            UserProfileId =2,
            },

            new Post {
            Id = 3,
            Title = "Sunny Sunday Paw-ty at the Dog Park! 🌞🐾",
            Content ="Sunday Funday with my fur baby! 🌞🐶 Took Mr. Fluffykins to the dog park, and he's making new friends left and right. 🐾❤️ What's your favorite way to spend a sunny Sunday? #DogParkAdventures #PuppyLove #FurryFriends",
            ImageLocation ="https://www.puppies.co.uk/media/announcement_categories/2021/1/goldendoodle-4110__w780_h780_c.jpg",
            CreateDateTime = new DateTime(2023, 01, 05), PublishDateTime = new DateTime(2023, 01, 06),
            IsApproved = true,
            CategoryId = 3,
            UserProfileId =3,
            },

            new Post {
            Id = 4,
            Title = "Chasing Dreams at the Grand Canyon: A Memory Worth Every Step! 🌄✨",
            Content ="Just crossed off a major bucket list item – the Grand Canyon! 😍🏜️ Standing on the edge of this natural wonder left me absolutely speechless. Mother Nature, you're a true artist! 🎨✨ Hiking, breathtaking views, and unforgettable memories - this trip had it all! Who else has experienced the awe of the Grand Canyon? Share your favorite moments! 🌄❤️ #GrandCanyonAdventure #BucketListChecked #NatureLover",
            ImageLocation ="https://cdn.outsideonline.com/wp-content/uploads/2022/08/grand-canyon-square.jpg",
            CreateDateTime = new DateTime(2023, 01, 07), PublishDateTime = new DateTime(2023, 01, 08),
            IsApproved = true,
            CategoryId = 4,
            UserProfileId =4,
            }
        });
    }
}