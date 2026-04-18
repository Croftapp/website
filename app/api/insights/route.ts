import { getAllInsights } from "@/lib/insights";
import { NextResponse } from "next/server";

export async function GET() {
  const insights = getAllInsights();
  return NextResponse.json(insights);
}
