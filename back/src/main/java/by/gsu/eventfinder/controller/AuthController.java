package by.gsu.eventfinder.controller;



import by.gsu.eventfinder.dto.request.auth.LoginRequest;
import by.gsu.eventfinder.dto.request.auth.RegisterRequest;
import by.gsu.eventfinder.dto.response.JwtResponse;
import by.gsu.eventfinder.dto.response.UserProfileResponse;
import by.gsu.eventfinder.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/auth")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.authenticateUser(loginRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<UserProfileResponse> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.registerUser(registerRequest));
    }
}