package com.ftn.tickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Discount.
 */
@Entity
@Table(name = "discount")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Discount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "percentage", nullable = false)
    private Float percentage;

    @OneToMany(mappedBy = "discount")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Seat> seats = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Discount name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getPercentage() {
        return percentage;
    }

    public Discount percentage(Float percentage) {
        this.percentage = percentage;
        return this;
    }

    public void setPercentage(Float percentage) {
        this.percentage = percentage;
    }

    public Set<Seat> getSeats() {
        return seats;
    }

    public Discount seats(Set<Seat> seats) {
        this.seats = seats;
        return this;
    }

    public Discount addSeats(Seat seat) {
        this.seats.add(seat);
        seat.setDiscount(this);
        return this;
    }

    public Discount removeSeats(Seat seat) {
        this.seats.remove(seat);
        seat.setDiscount(null);
        return this;
    }

    public void setSeats(Set<Seat> seats) {
        this.seats = seats;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Discount discount = (Discount) o;
        if (discount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), discount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Discount{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", percentage=" + getPercentage() +
            "}";
    }
}
