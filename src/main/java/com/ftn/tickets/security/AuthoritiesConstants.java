package com.ftn.tickets.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    public static final String AIRLINE_ADMIN = "ROLE_AIRLINE_ADMIN";

    public static final String HOTEL_ADMIN = "ROLE_HOTEL_ADMIN";

    public static final String RENT_A_CAR_ADMIN = "ROLE_RENT_A_CAR_ADMIN";

    private AuthoritiesConstants() {
    }
}
