import { defineCollection, z } from "astro:content";

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
    instagram: z.array(z.object({ 
      image: z.string(), 
      link: z.string().url().optional() 
    })).max(8),
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
  type: "data", 
  schema: z.array(z.object({
    name: z.string(),
    logo: z.string()
  }))
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

const settings = defineCollection({
  type: 'data',
  schema: z.any(),
});

const team = defineCollection({
  type: 'data',
  schema: z.any(),
});

const slider = defineCollection({
  type: 'content',
  schema: z.any(),
});

const fairYears = defineCollection({
  type: 'data',
  schema: z.object({
    year: z.number(),
    is_active: z.boolean(),
    fairs: z.array(z.object({
      basic_info: z.object({
        name_tr: z.string(),
        name_en: z.string(),
        date: z.string(),
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
        name: z.string(),
        title: z.string(),
        email: z.string(),
        phone: z.string(),
      }).optional(),
      settings: z.object({
        show_in_slider: z.boolean(),
        show_in_forms: z.boolean(),
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
  settings, 
  team, 
  slider,
  'fair-years': fairYears
};
