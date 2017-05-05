using System.Collections.Generic;
using Umbraco.Core.Models;

namespace DocTypeInspection.Models.ViewModels
{
    public class DocTypeViewModel
    {
        public string Description { get; set; }
        public bool AllowAtRoot { get; set; }
        public IEnumerable<Template> Templates { get; set; }
        public Template DefaultTemplate { get; set; }
        public string LastEditedOn { get; set; }
        public string LastEditedBy { get; set; }
        public string CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public ContentStatus Status { get; set; }
    }
}
