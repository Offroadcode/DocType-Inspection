using System.Collections.Generic;

namespace DocTypeInspection.Models.ViewModels
{
    public class DocTypeViewModel
    {
        public string Description { get; set; }
        public bool AllowAtRoot { get; set; }
        public IEnumerable<Template> Templates { get; set; }
        public Template DefaultTemplate { get; set; }
    }
}
