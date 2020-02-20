using System;
using System.ComponentModel.DataAnnotations;

namespace Blog.Models
{
    public class BlogPostComment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string AuthorName { get; set; }

        [Required]
        public string Text { get; set; }
        [Required]
        public DateTime CreateAt { get; set; }
        public BlogPost BlogPost { get; set; }
    }
}
