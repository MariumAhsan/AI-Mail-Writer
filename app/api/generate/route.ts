import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { tone, subject, context } = await req.json();

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant", // Supported and stable
      messages: [
        {
          role: "system",
          content: `You write clear and professional emails based on tone, subject, and context.`
        },
        {
          role: "user",
          content: `Write an email.\nTone: ${tone}\nSubject: ${subject}\nDetails: ${context}`
        }
      ]
    })
  });

  const data = await response.json();
  console.log("GROQ FULL RESPONSE --->", data);

  const email = data?.choices?.[0]?.message?.content || "No response generated.";
  return NextResponse.json({ email });
}
