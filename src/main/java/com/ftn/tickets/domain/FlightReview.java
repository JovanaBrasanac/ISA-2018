package com.ftn.tickets.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A FlightReview.
 */
@Entity
@Table(name = "flight_review")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FlightReview implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "grade", nullable = false)
    private Integer grade;

    @OneToOne(optional = false)    @NotNull
    @JoinColumn(unique = true)
    private Ticket ticket;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public FlightReview description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getGrade() {
        return grade;
    }

    public FlightReview grade(Integer grade) {
        this.grade = grade;
        return this;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public FlightReview ticket(Ticket ticket) {
        this.ticket = ticket;
        return this;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
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
        FlightReview flightReview = (FlightReview) o;
        if (flightReview.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flightReview.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FlightReview{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", grade=" + getGrade() +
            "}";
    }
}
