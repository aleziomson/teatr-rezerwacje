import React from 'react'
import "./Home.css";

export default function Home() {
    return (
        <>
            <section class="hero-section" style={{ backgroundImage: `url('/images/Calineczka.png')` }}>
                <div class="hero-content">
                    <h1 class="hero-title">Witaj w Teatro Online</h1>
                    <p class="hero-subtitle">Odkryj magię teatru w wyjątkowym repertuarze naszych przedstawień</p>
                    <div class="hero-buttons">
                        <a href="/spektakle" class="hero-button primary-button">Przeglądaj spektakle</a>
                        <a href="/repertuar" class="hero-button secondary-button">Zobacz repertuar</a>
                    </div>
                </div>
            </section>

            <section class="about-section">
                <div class="about-container">
                    <div class="about-content">
                        <h2 class="about-title">O naszym teatrze</h2>
                        <p class="about-text">Teatro Online to przestrzeń, w której sztuka spotyka się z innowacją. Od ponad 15 lat dostarczamy niezapomnianych wrażeń teatralnych, dbając o najwyższą jakość przedstawień i komfort naszych widzów.</p>
                        <p class="about-text">Nasz zespół składa się z doświadczonych aktorów, reżyserów i scenografów, których pasją jest tworzenie magicznych doświadczeń scenicznych.</p>
                        <div class="about-stats">
                            <div class="stat-item">
                                <div class="stat-number">350+</div>
                                <div class="stat-label">Przedstawień rocznie</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">25</div>
                                <div class="stat-label">Tytułów w repertuarze</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">50000+</div>
                                <div class="stat-label">Zadowolonych widzów</div>
                            </div>
                        </div>
                    </div>
                    <div class="about-image" style={{ backgroundImage: `url('/images/Calineczka.png')` }}></div>
                </div>
            </section>

        </>
    )
}
