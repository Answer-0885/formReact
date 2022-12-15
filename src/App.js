import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // Хук useEffect имеет два аргумента 1 - функция, 
  //которая запускается в случае изменения 2 - аргумента(dependences)
  // Но так как второй аргумент пустой массив, то он и не меняется. Соответственно и 
  // функция перезапускаться не будет. При перезагрузке страницы. И пользователь останется авторизованным.
  useEffect(()=>{
      // Проверяем есть ли в localStorage ключ со значением '1'. 
      // Сам доступ к localStorage является побочным эффектом
      const storedLoginInfo = localStorage.getItem('isLoggedIn');
        if(storedLoginInfo==='1'){
         setIsLoggedIn(true);
     }
  }, [])

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1'); 
    setIsLoggedIn(true);
  };
  // При нажатии кнопки ВЫЙТИ данные из localStorage стираются
  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
