package com.backend.WheaterWise.external;

import com.backend.WheaterWise.dto.external.OpenWeatherResponse;
import com.backend.WheaterWise.exception.CityNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class OpenWeatherClient {

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.base-url}")
    private String baseUrl;

    //WebClient is Async by default - Spring's Modern HTTP client (used to call APIs)
    private final WebClient webClient =  WebClient.create();//Creates a client

    //Here we take a city name and return Weather Data as OpenWeatherResponse
    public OpenWeatherResponse getCurrentWeather(String city){
        return webClient.get() // .get() -> I want to send a GET request
                .uri(baseUrl + "/weather?q={city}&appid={key}&units=metric",city,apiKey)//Creates a url dynamically
                .retrieve()//Send the Request and get the response body
                .onStatus( // Used to Handle Errors
                        status -> status.is4xxClientError(), // Creating a Stream such that 4xx = client Errors(like wrong city name)
                        //If we found a error in 400-499 range
                        response -> Mono.error(new CityNotFoundException("City not found: " + city))//Mono.error -> Creates an Error Signal which return the CityNotFoundException
                )
                //Mono = a box that will get data soon
                .bodyToMono(OpenWeatherResponse.class)//Convert Response to Java Object
                .block(); // Wait until the data is ready and gives you the result

        //Without .block() -> its async(non-blocking)
        //With .block() -> Its synchronous (waits like normal code)

    }
}
