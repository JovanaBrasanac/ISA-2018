package com.ftn.tickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.ftn.tickets.domain.enumeration.SeatType;

/**
 * A Seat.
 */
@Entity
@Table(name = "seat")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Seat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "seat_type", nullable = false)
    private SeatType seatType;

    @NotNull
    @Column(name = "jhi_row", nullable = false)
    private Integer row;

    @NotNull
    @Column(name = "jhi_column", nullable = false)
    private Integer column;

    @NotNull
    @Column(name = "price", nullable = false)
    private Float price;

    @NotNull
    @Column(name = "reserved", nullable = false)
    private Boolean reserved;

    @Column(name = "date_of_sale")
    private LocalDate dateOfSale;

    @Column(name = "time_of_sale")
    private String timeOfSale;

    @OneToOne(mappedBy = "seat")
    @JsonIgnore
    private Ticket ticket;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("setas")
    private AllSeatsConfiguration allSeats;

    @ManyToOne
    @JsonIgnoreProperties("seats")
    private Discount discount;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SeatType getSeatType() {
        return seatType;
    }

    public Seat seatType(SeatType seatType) {
        this.seatType = seatType;
        return this;
    }

    public void setSeatType(SeatType seatType) {
        this.seatType = seatType;
    }

    public Integer getRow() {
        return row;
    }

    public Seat row(Integer row) {
        this.row = row;
        return this;
    }

    public void setRow(Integer row) {
        this.row = row;
    }

    public Integer getColumn() {
        return column;
    }

    public Seat column(Integer column) {
        this.column = column;
        return this;
    }

    public void setColumn(Integer column) {
        this.column = column;
    }

    public Float getPrice() {
        return price;
    }

    public Seat price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Boolean isReserved() {
        return reserved;
    }

    public Seat reserved(Boolean reserved) {
        this.reserved = reserved;
        return this;
    }

    public void setReserved(Boolean reserved) {
        this.reserved = reserved;
    }

    public LocalDate getDateOfSale() {
        return dateOfSale;
    }

    public Seat dateOfSale(LocalDate dateOfSale) {
        this.dateOfSale = dateOfSale;
        return this;
    }

    public void setDateOfSale(LocalDate dateOfSale) {
        this.dateOfSale = dateOfSale;
    }

    public String getTimeOfSale() {
        return timeOfSale;
    }

    public Seat timeOfSale(String timeOfSale) {
        this.timeOfSale = timeOfSale;
        return this;
    }

    public void setTimeOfSale(String timeOfSale) {
        this.timeOfSale = timeOfSale;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public Seat ticket(Ticket ticket) {
        this.ticket = ticket;
        return this;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public AllSeatsConfiguration getAllSeats() {
        return allSeats;
    }

    public Seat allSeats(AllSeatsConfiguration allSeatsConfiguration) {
        this.allSeats = allSeatsConfiguration;
        return this;
    }

    public void setAllSeats(AllSeatsConfiguration allSeatsConfiguration) {
        this.allSeats = allSeatsConfiguration;
    }

    public Discount getDiscount() {
        return discount;
    }

    public Seat discount(Discount discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Discount discount) {
        this.discount = discount;
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
        Seat seat = (Seat) o;
        if (seat.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), seat.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Seat{" +
            "id=" + getId() +
            ", seatType='" + getSeatType() + "'" +
            ", row=" + getRow() +
            ", column=" + getColumn() +
            ", price=" + getPrice() +
            ", reserved='" + isReserved() + "'" +
            ", dateOfSale='" + getDateOfSale() + "'" +
            ", timeOfSale='" + getTimeOfSale() + "'" +
            "}";
    }
}
