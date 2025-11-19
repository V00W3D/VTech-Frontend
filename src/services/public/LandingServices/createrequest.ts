// src/services/public/createRequest.ts
import { api } from "@api";
import { landing } from "@endpoints/public";
import type { ApiResponse, RequestData } from "./types";
import { z } from "zod";

// Frontend schema: userId, service (name), target (name), description
const createRequestSchema = z.object({
  userId: z.string().min(5),
  service: z.string().min(2),
  target: z.string().min(2),
  description: z.string().min(5),
});

export type CreateRequestInput = z.infer<typeof createRequestSchema>;

export const createRequest = async (
  params: CreateRequestInput
): Promise<ApiResponse<RequestData>> => {
  createRequestSchema.parse(params);
  try {
    const { data } = await api.post(landing.createrequest, params);
    return { ok: true, message: data.message, data: data.data };
  } catch (err: any) {
    console.error("[LandingService.createRequest] Error:", err);
    return {
      ok: false,
      error: err.response?.data?.message || err.message,
      message: "uwu",
    };
  }
};
