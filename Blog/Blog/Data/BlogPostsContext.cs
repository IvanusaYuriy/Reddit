using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Blog.Models
{
    public class BlogPostsContext : DbContext
    {

        public BlogPostsContext(DbContextOptions<BlogPostsContext> options)
            : base(options)
        {
        }

        public DbSet<Blog.Models.BlogPost> BlogPost { get; set; }
        public DbSet<Blog.Models.BlogPostComment> BlogPostComment { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Write Fluent API configurations here

            //Property Configurations
            modelBuilder.Entity<BlogPostComment>(entity =>
            {
                entity.HasOne(x => x.BlogPost)
                      .WithMany(x => x.Comments);
            });


        }
    }

}
