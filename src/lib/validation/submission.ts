import { z } from "zod";

export const submissionSchema = z.object({
    githubLink: z.string().url('Invalid url'),
    twitterPostLink: z.string().optional(),
    deploymentLink: z.string().optional(),
  });
  
export type SubmissionType = z.infer<typeof submissionSchema>;

export const submissionReviewSchema = z.object({
    bounty: z.string().optional(),
    feedback: z.string().optional(),
    adminSecret: z.string(),
  });
  
export type SubmissionReviewType = z.infer<typeof submissionReviewSchema>;