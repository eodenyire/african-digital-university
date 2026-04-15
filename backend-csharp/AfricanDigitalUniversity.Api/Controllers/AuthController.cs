using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AfricanDigitalUniversity.Api.DTOs;
using AfricanDigitalUniversity.Api.Middleware;
using AfricanDigitalUniversity.Api.Services;

namespace AfricanDigitalUniversity.Api.Controllers;

[ApiController]
[Route("auth")]
public class AuthController(AuthService authService) : ControllerBase
{
    [HttpPost("signup")]
    public async Task<ActionResult<AuthResponse>> SignUp([FromBody] SignUpRequest request)
    {
        try
        {
            var result = await authService.SignUpAsync(request);
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { error = ex.Message });
        }
    }

    [HttpPost("signin")]
    public async Task<ActionResult<AuthResponse>> SignIn([FromBody] SignInRequest request)
    {
        try
        {
            var result = await authService.SignInAsync(request);
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { error = ex.Message });
        }
    }

    [Authorize]
    [HttpPost("signout")]
    public new IActionResult SignOut()
    {
        // JWT is stateless; client discards the token
        return Ok(new { message = "Signed out successfully." });
    }

    [Authorize]
    [HttpGet("session")]
    public async Task<ActionResult<SessionResponse>> Session()
    {
        if (!User.TryGetUserId(out var userId))
            return Ok(new SessionResponse(null));

        var user = await authService.GetSessionUserAsync(userId);
        return Ok(new SessionResponse(user));
    }
}
