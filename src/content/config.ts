import { defineCollection, z } from "astro:content";

const sectors = defineCollection({
  type: "data",
  schema: z.object({
    name_tr: z.string(),
    name_en: z.string(),
    slug: z.string(),
    order: z.number().default(0),
    is_active: z.boolean().default(true),
    description_tr: z.string().optional(),
    description_en: z.string().optional(),
  }),
});

const home = defineCollection({
  type: "data",
  schema: z.object({
    hero: z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      ctaText: z.string().optional(),
      ctaUrl: z.string().url().optional(),
      yearBadge: z.string().optional(),
      slides: z.array(z.object({
        backgroundImage: z.string(),
        card: z.object({
          title: z.string(),
          dateText: z.string().optional(),
          location: z.string().optional(),
          description: z.string().optional(),
          fairName: z.string(),
          fairLogo: z.string().optional(),
          fairWebsite: z.string().url().optional(),
          buttons: z.array(z.object({ 
            text: z.string(), 
            url: z.string() 
          })).max(2).optional()
        })
      })).min(1)
    }),
    metrics: z.array(z.object({ 
      value: z.string(), 
      label: z.string() 
    })).length(3),
    about: z.object({ 
      title: z.string(), 
      html: z.string(),
      ctaText: z.string().optional()
    }),
    partners: z.array(z.object({ 
      name: z.string(), 
      logo: z.string() 
    })),
    fairSupport: z.object({ 
      title: z.string(), 
      html: z.string(),
      description: z.string().optional(),
      governmentText: z.string().optional(),
      kosgebText: z.string().optional()
    }),
    instagram: z.object({
      homedeco: z.object({
        title: z.string(),
        username: z.string(),
        instagram_url: z.string().url(),
        image: z.string()
      }),
      leshow: z.object({
        title: z.string(),
        username: z.string(),
        instagram_url: z.string().url(),
        image: z.string()
      })
    }),
    newsletter: z.object({ 
      title: z.string(), 
      placeholder: z.string(), 
      cta: z.string() 
    }),
    footer: z.object({
      description: z.string(),
      sections: z.object({
        contact: z.string(),
        calendar: z.string(),
        links: z.string(),
        fairs: z.string()
      }),
      links: z.object({
        calendar: z.array(z.string()),
        useful: z.array(z.string()),
        fairs: z.array(z.string())
      }),
      copyright: z.string()
    })
  })
});

const partners = defineCollection({
  type: "content", 
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    website: z.string().optional(),
    order: z.number().optional(),
    is_active: z.boolean().optional()
  })
});

// CMS Collections
const fairs = defineCollection({
  type: 'content',
  schema: z.object({
    basic_info: z.object({
      name_tr: z.string(),
      name_en: z.string(),
      date: z.string(),
      location_tr: z.string(),
      location_en: z.string(),
      year: z.number(),
    }),
    visuals: z.object({
      logo: z.string(),
      background_image: z.string(),
    }),
    settings: z.object({
      show_in_slider: z.boolean(),
      show_in_forms: z.boolean(),
      is_active: z.boolean(),
    }),
  }),
});

const timeline = defineCollection({
  type: 'content',
  schema: z.object({
    fair_name: z.string(),
    year: z.number(),
    city: z.string(),
    country: z.string(),
    area: z.string(),
    participants: z.string(),
    sector: z.string(),
    order: z.number(),
  }),
});



const chronologyYears = defineCollection({
  type: 'data',
  schema: z.object({
    cms_button_label: z.string().optional(),
    year: z.number(),
    is_active: z.boolean(),
    fairs: z.array(z.object({
      // Yeni field'lar
      name_tr: z.string().optional(),
      name_en: z.string().optional(),
      city_tr: z.string().optional(),
      city_en: z.string().optional(),
      country_tr: z.string().optional(),
      country_en: z.string().optional(),
      description_tr: z.string().optional(),
      description_en: z.string().optional(),
      // Eski field'lar (geriye uyumluluk)
      name: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
      description: z.string().optional(),
      // Ortak field'lar
      sector: z.string(),
      area: z.string().optional(),
      participants: z.string().optional(),
      order: z.number(),
    })),
  }),
});

const settings = defineCollection({
  type: 'data',
  schema: z.any(),
});

const team = defineCollection({
  type: 'data',
  schema: z.any(),
});

const teamMembers = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.object({
      tr: z.string(),
      en: z.string(),
    }),
    department: z.object({
      tr: z.string(),
      en: z.string(),
    }),
    email: z.string(),
    phone: z.string().optional(),
    order: z.number(),
    is_active: z.boolean(),
    is_fair_representative: z.boolean(),
  }),
});

const heroSlides = defineCollection({
  type: 'content',
  schema: z.object({
    title_tr: z.string(),
    title_en: z.string(),
    date_tr: z.string().optional(),
    date_en: z.string().optional(),
    location_tr: z.string().optional(),
    location_en: z.string().optional(),
    description_tr: z.string().optional(),
    description_en: z.string().optional(),
    background_image: z.string(),
    logo: z.string().optional(),
    website_url: z.string().optional(),
    mini_images: z.array(z.string()).optional(),
    maps_embed: z.string().optional(),
    order: z.number().optional(),
    is_active: z.boolean().optional()
  })
});

const slider = defineCollection({
  type: 'content',
  schema: z.any(),
});

const fairYears = defineCollection({
  type: 'data',
  schema: z.object({
    cms_button_label: z.string().optional(),
    year: z.number(),
    page_slug: z.string().optional(),
    page_slug_en: z.string().optional(),
    is_active: z.boolean(),
    display_status: z.string().optional(),
    menu_order: z.number().optional(),
    page_content: z.object({
      title_tr: z.string().optional(),
      title_en: z.string().optional(),
      menu_title_tr: z.string().optional(),
      menu_title_en: z.string().optional(),
      description_tr: z.string().optional(),
      description_en: z.string().optional(),
    }).optional(),
    fairs: z.array(z.object({
      basic_info: z.object({
        name_tr: z.string(),
        name_en: z.string(),
        start_date: z.date().optional(),
        end_date: z.date().optional(),
        hide_dates: z.boolean().optional(),
        location_tr: z.string(),
        location_en: z.string(),
        sector: z.string(),
        description_tr: z.string().optional(),
        description_en: z.string().optional(),
      }),
      visuals: z.object({
        logo: z.string(),
        background_image: z.string(),
      }).optional(),
      representative: z.object({
        team_member: z.string().optional(),
        phone: z.string().optional(),
        hide_phone: z.boolean().optional(),
      }).optional(),
      settings: z.object({
        order: z.number().optional(),
        show_in_slider: z.boolean().optional(),
        show_in_forms: z.boolean().optional(),
        show_in_chronology: z.boolean().optional(),
      }).optional(),
      chronology_info: z.object({
        area: z.string().optional(),
        participants: z.string().optional(),
        description: z.string().optional(),
      }).optional(),
      slider_content: z.object({
        website_url: z.string().optional(),
        maps_embed: z.string().optional(),
        background_image: z.string().optional(),
        mini_images: z.array(z.object({
          image: z.string()
        })).optional(),
      }).optional(),
    })),
  }),
});

export const collections = { 
  home, 
  partners, 
  fairs, 
  timeline, 
  'chronology-years': chronologyYears,
  settings, 
  team, 
  'team-members': teamMembers,
  'hero-slides': heroSlides,
  slider,
  'fair-years': fairYears,
  sectors
};
