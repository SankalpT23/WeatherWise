package com.backend.WheaterWise.service;

import com.backend.WheaterWise.dto.responses.WeatherResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AIInsightService {

    @Autowired(required = true)
    private ChatClient chatClient;

    public String generateInsight(WeatherResponse weather){
        String prompt = """
                            You are a helpful weather assistant for Indian cities.
                
                            Current weather in %s:
                            - Temperature: %.1f°C (feels like %.1f°C)
                            - Humidity: %.0f%%
                            - Condition: %s (%s)
                            - Wind Speed: %.1f km/h
                
                            Give a helpful, friendly 2-3 sentence weather briefing.
                            Include: should they carry umbrella, is it good for outdoors,
                            any specific advice for this weather.
                            Keep it conversational. No bullet points.
                """.formatted(
                        weather.getCity(),
                        weather.getTemperature(),
                        weather.getFeelsLike(),
                        weather.getHumidity(),
                        weather.getCondition(),
                        weather.getDescription(),
                        weather.getWindSpeed()
        );
        try{
        return chatClient.prompt(prompt)
                .call()
                .content();

        }catch (Exception e){
            return "AI insights are temporarily unavailable. Please try again later.";
        }
    }
}
