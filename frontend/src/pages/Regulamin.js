import React from "react";
import "./Regulamin.css";

function Regulamin() {
  return (<>
    <main class="regulamin-container">
      {/* <header class="regulamin-header">
        <h1>Regulamin <span class="accent-text">Teatru</span></h1>
        <p class="regulamin-subtitle">Zasady korzystania z systemu rezerwacji biletów</p>
      </header> */}

      <div class="regulamin-content">
        <section class="regulamin-section">
          <h2>§1. Postanowienia ogólne</h2>
          <div class="regulamin-text">
            <p>1.1. Niniejszy regulamin określa zasady korzystania z systemu rezerwacji biletów online w Teatrze.</p>
            <p>1.2. Korzystanie z systemu rezerwacji biletów online oznacza akceptację niniejszego regulaminu.</p>
            <p>1.3. System rezerwacji jest własnością Teatru z siedzibą przy ul. Teatralna 1, 00-001 Warszawa.</p>
          </div>
        </section>

        <section class="regulamin-section">
          <h2>§2. Rejestracja i konto użytkownika</h2>
          <div class="regulamin-text">
            <p>2.1. Aby korzystać z pełnej funkcjonalności systemu rezerwacji, użytkownik zobowiązany jest do założenia konta.</p>
            <p>2.2. Podczas rejestracji użytkownik podaje prawdziwe dane osobowe oraz akceptuje regulamin.</p>
            <p>2.3. Użytkownik ponosi pełną odpowiedzialność za bezpieczeństwo swojego hasła i danych dostępowych.</p>
            <p>2.4. Teatr zastrzega sobie prawo do usunięcia konta użytkownika w przypadku naruszenia regulaminu.</p>
          </div>
        </section>

        <section class="regulamin-section">
          <h2>§3. Rezerwacja biletów</h2>
          <div class="regulamin-text">
            <p>3.1. Rezerwacja biletów jest możliwa wyłącznie dla zalogowanych użytkowników.</p>
            <p>3.2. Użytkownik może zarezerwować maksymalnie 10 biletów na jedno przedstawienie.</p>
            <p>3.3. Rezerwacja jest ważna przez 48 godzin od momentu jej dokonania. Po tym czasie niepotwierdzone rezerwacje są automatycznie anulowane.</p>
            <p>3.4. W celu potwierdzenia rezerwacji należy dokonać płatności online lub w kasie Teatru w terminie określonym w punkcie 3.3.</p>
          </div>
        </section>

        <section class="regulamin-section">
          <h2>§4. Płatności</h2>
          <div class="regulamin-text">
            <p>4.1. Płatności online można dokonać za pomocą karty płatniczej, przelewu bankowego lub innych dostępnych form płatności elektronicznych.</p>
            <p>4.2. Wszystkie transakcje są zabezpieczone protokołem SSL.</p>
            <p>4.3. Po dokonaniu płatności użytkownik otrzyma potwierdzenie na adres e-mail podany podczas rejestracji.</p>
          </div>
        </section>

        <section class="regulamin-section">
          <h2>§5. Zwroty i wymiana biletów</h2>
          <div class="regulamin-text">
            <p>5.1. Zwrot biletu jest możliwy nie później niż 3 dni przed datą przedstawienia.</p>
            <p>5.2. W przypadku odwołania przedstawienia z przyczyn leżących po stronie Teatru, użytkownik ma prawo do zwrotu pełnej kwoty biletu lub wymiany na inny dostępny termin.</p>
            <p>5.3. Procedura zwrotu rozpoczyna się od zgłoszenia w panelu użytkownika w sekcji "Moje Rezerwacje".</p>
          </div>
        </section>

        <section class="regulamin-section">
          <h2>§6. Ochrona danych osobowych</h2>
          <div class="regulamin-text">
            <p>6.1. Administratorem danych osobowych jest Teatr.</p>
            <p>6.2. Dane osobowe są przetwarzane zgodnie z obowiązującymi przepisami o ochronie danych osobowych, w szczególności zgodnie z RODO.</p>
            <p>6.3. Szczegółowe informacje dotyczące przetwarzania danych osobowych znajdują się w Polityce Prywatności.</p>
          </div>
        </section>

        <section class="regulamin-section">
          <h2>§7. Postanowienia końcowe</h2>
          <div class="regulamin-text">
            <p>7.1. Teatr zastrzega sobie prawo do zmiany regulaminu w dowolnym czasie.</p>
            <p>7.2. O zmianach w regulaminie użytkownicy będą informowani za pośrednictwem strony internetowej Teatru lub wiadomości e-mail.</p>
            <p>7.3. W sprawach nieuregulowanych niniejszym regulaminem mają zastosowanie przepisy prawa polskiego.</p>
          </div>
        </section>
      </div>

      {/* <div class="regulamin-actions">
        <button class="action-button download-button">
          <span class="download-icon"></span>
          Pobierz regulamin
        </button>
      </div> */}
    </main>

    <div class="regulamin-footer">
      <p>Ostatnia aktualizacja regulaminu: 26.04.2025</p>
    </div></>
  );
}

export default Regulamin;
