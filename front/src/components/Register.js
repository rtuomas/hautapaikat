import Header from './Header'

const Register = () => {
    return (
        <div>
            <Header />
            <div id="logInContainer">
                <h1 style={{ color: "white" }}>Rekisteröidy</h1>
                <div class="form__group field">
                    <input type="input" class="form__field" placeholder="Käyttäjätunnus" name="username" id='username' required />
                    <label for="name" class="form__label">Käyttäjätunnus</label>
                </div>
                <div class="form__group field">
                    <input type="input" class="form__field" placeholder="Salasana" name="password" id='password' required />
                    <label for="name" class="form__label">Salasana</label>
                </div>
                <div class="form__group field">
                    <input type="input" class="form__field" placeholder="Salasana" name="password" id='password' required />
                    <label for="name" class="form__label">Syötä salasana uudelleen</label>
                </div>

                <div class="button" id="button-2">
                    <div id="slide"></div>
                    <p>Luo käyttäjä</p>
                </div>

            </div>
        </div>
    )
  }

  export default Register