import React from "react";
import "./Cennik.css";

function Cennik() {
  return (
    <>

      <section class="pricing-container">

        <div class="pricing-grid">

          <div class="price-card">
            <div class="price-header">
              <h3 class="price-title">Bilet normalny</h3>
              <p class="price-description">Dla wszystkich widzów</p>
            </div>
            <div class="price-details">
              <div class="price-amount">
                <span class="price-value">70-120 zł</span>
                <span class="price-period">/ osoba</span>
              </div>
              <ul class="price-features">
                <li><span class="feature-icon"></span>Wszystkie spektakle repertuarowe</li>
                <li><span class="feature-icon"></span>Wybór miejsca</li>
                <li><span class="feature-icon"></span>Dostęp do programu</li>
                <li><span class="feature-icon"></span>Możliwość rezerwacji online</li>
              </ul>
            </div>
            <div class="price-actions">
              <a href="/spektakle" class="reserve-button">Przejdź do rezerwacji</a>
            </div>
          </div>


          <div class="price-card">
            <div class="price-header">
              <h3 class="price-title">Bilet ulgowy</h3>
              <p class="price-description">Dla uczniów, studentów, seniorów</p>
            </div>
            <div class="price-details">
              <div class="price-amount">
                <span class="price-value">50-80 zł</span>
                <span class="price-period">/ osoba</span>
              </div>
              <ul class="price-features">
                <li><span class="feature-icon"></span>Wszystkie spektakle repertuarowe</li>
                <li><span class="feature-icon"></span>Wybór miejsca</li>
                <li><span class="feature-icon"></span>Dostęp do programu</li>
                <li><span class="feature-icon"></span>Wymagany dokument uprawniający do zniżki</li>
              </ul>
            </div>
            <div class="price-actions">
              <a href="/spektakle" class="reserve-button">Przejdź do rezerwacji</a>
            </div>
          </div>


          <div class="price-card">
            <div class="price-header">
              <h3 class="price-title">Bilet grupowy</h3>
              <p class="price-description">Dla grup 10+ osób</p>
            </div>
            <div class="price-details">
              <div class="price-amount">
                <span class="price-value">60-90 zł</span>
                <span class="price-period">/ osoba</span>
              </div>
              <ul class="price-features">
                <li><span class="feature-icon"></span>Wszystkie spektakle repertuarowe</li>
                <li><span class="feature-icon"></span>Wybór miejsc obok siebie</li>
                <li><span class="feature-icon"></span>Opieka koordynatora grup</li>
                <li><span class="feature-icon"></span>Wymagana rezerwacja z wyprzedzeniem</li>
              </ul>
            </div>
            <div class="price-actions">
              <a href="/spektakle" class="reserve-button">Przejdź do rezerwacji</a>
            </div>
          </div>
        </div>

        <div class="pricing-note">
          <p><strong>Uwaga:</strong> Ceny mogą się różnić w zależności od wybranego spektaklu. Bilety na premiery, wydarzenia specjalne i spektakle gościnne mogą mieć inne ceny.</p>
        </div>


        <div class="pricing-table-container">
          <table class="pricing-table">
            <thead>
              <tr>
                <th>Strefa</th>
                <th>Bilet normalny</th>
                <th>Bilet ulgowy</th>
                <th>Bilet grupowy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Strefa I (Parter, rzędy 1-10)</td>
                <td class="table-price">120 zł</td>
                <td class="table-price">80 zł</td>
                <td class="table-price">90 zł</td>
              </tr>
              <tr>
                <td>Strefa II (Parter, rzędy 11-20)</td>
                <td class="table-price">100 zł</td>
                <td class="table-price">70 zł</td>
                <td class="table-price">80 zł</td>
              </tr>
              <tr>
                <td>Strefa III (Balkon, rzędy 1-5)</td>
                <td class="table-price">90 zł</td>
                <td class="table-price">60 zł</td>
                <td class="table-price">70 zł</td>
              </tr>
              <tr>
                <td>Strefa IV (Balkon, rzędy 6-10)</td>
                <td class="table-price">70 zł</td>
                <td class="table-price">50 zł</td>
                <td class="table-price">60 zł</td>
              </tr>
              <tr>
                <td>Premiery i wydarzenia specjalne</td>
                <td class="table-price">150 zł</td>
                <td class="table-price">100 zł</td>
                <td class="table-price">120 zł</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="faq-section">
        <h2 class="faq-title">Najczęściej zadawane pytania</h2>

        <div class="faq-item">
          <div class="faq-question">
            Jak mogę zarezerwować bilety?
          </div>
          <div class="faq-answer">
            <p>Bilety można zarezerwować online przez nasz system rezerwacji, telefonicznie lub osobiście w kasie teatru. Aby dokonać rezerwacji online, przejdź do sekcji Repertuar, wybierz interesujący Cię spektakl i wykonaj kolejne kroki systemu rezerwacji.</p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            Czy mogę zwrócić zakupiony bilet?
          </div>
          <div class="faq-answer">
            <p>Bilety można zwrócić najpóźniej 3 dni przed spektaklem. W przypadku rezygnacji ze spektaklu w terminie krótszym niż 3 dni przed wydarzeniem, zwrot kosztów nie jest możliwy. Szczegółowe informacje znajdują się w regulaminie.</p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            Jakie zniżki oferuje teatr?
          </div>
          <div class="faq-answer">
            <p>Oferujemy zniżki dla uczniów, studentów (do 26 roku życia), seniorów (powyżej 65 roku życia), osób z niepełnosprawnościami oraz grup zorganizowanych (powyżej 10 osób). Aby skorzystać ze zniżki, niezbędne jest okazanie dokumentu uprawniającego do zniżki.</p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            Czy mogę zmienić datę rezerwacji?
          </div>
          <div class="faq-answer">
            <p>Tak, zmiana daty jest możliwa najpóźniej 3 dni przed spektaklem, pod warunkiem dostępności miejsc na wybrany nowy termin. Aby dokonać zmiany, skontaktuj się z naszą infolinią lub odwiedź kasę teatru.</p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            Czy jest możliwość rezerwacji miejsc dla osób z niepełnosprawnościami?
          </div>
          <div class="faq-answer">
            <p>Tak, nasz teatr jest w pełni dostosowany do potrzeb osób z niepełnosprawnościami. Posiadamy specjalne miejsca dla osób poruszających się na wózkach inwalidzkich. Rezerwacji takich miejsc najlepiej dokonać telefonicznie lub osobiście w kasie teatru.</p>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="cta-container">
          <h2 class="cta-title">Zarezerwuj bilet już teraz</h2>
          <p class="cta-text">Wybierz interesujący Cię spektakl i zarezerwuj najlepsze miejsca na przedstawienie</p>
          <a href="/spektakle" class="cta-button">Przejdź do Spektakli</a>
        </div>
      </section></>
  );
}

export default Cennik;
