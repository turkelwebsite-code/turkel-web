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

export const collections = { home, partners };
