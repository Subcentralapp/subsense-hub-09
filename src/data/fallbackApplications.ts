import { Application } from "@/types/application";
import { streamingApplications } from "./applications/streaming-applications";
import { musicApplications } from "./applications/music-applications";
import { gamingApplications } from "./applications/gaming-applications";
import { productivityApplications } from "./applications/productivity-applications";
import { educationApplications } from "./applications/education-applications";
import { wellbeingApplications } from "./applications/wellbeing-applications";
import { aiApplications } from "./applications/ai-applications";

export const fallbackApplications: Application[] = [
  ...aiApplications,
  ...streamingApplications,
  ...musicApplications,
  ...gamingApplications,
  ...productivityApplications,
  ...educationApplications,
  ...wellbeingApplications
];