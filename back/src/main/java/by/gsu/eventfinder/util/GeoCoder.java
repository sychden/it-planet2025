package by.gsu.eventfinder.util;


import by.gsu.eventfinder.exeption.GeoCodingException;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;


import java.util.List;

@Component
@RequiredArgsConstructor
public class GeoCoder {

    private final RestTemplate restTemplate;

    @Value("${app.geocode.api-key}")
    private String apiKey;

    @Value("${app.geocode.url}")
    private String geocodeUrl;

    public GeoCoordinates getCoordinates(String address) {
        String url = String.format("%s?address=%s&key=%s",
                geocodeUrl, address, apiKey);

        GeocodeResponse response = restTemplate.getForObject(url, GeocodeResponse.class);

        if (response != null && !response.getResults().isEmpty()) {
            return response.getResults().get(0).getGeometry().getLocation();
        }
        throw new GeoCodingException("Failed to geocode address: " + address);
    }

    // Вложенные DTO для парсинга ответа API
    @Data
    public static class GeocodeResponse {
        private List<Result> results;
    }

    @Data
    public static class Result {
        private Geometry geometry;
    }

    @Data
    public static class Geometry {
        private GeoCoordinates location;
    }

    @Data
    public static class GeoCoordinates {
        private double lat;
        private double lng;

        public Double getLatitude() {
            return lat;
        }

        public Double getLongitude() {
            return lng;
        }
    }


}