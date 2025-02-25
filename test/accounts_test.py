from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webdriver import WebDriver
import re

class Accounts:
    def __init__(self, driver: WebDriver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)
        self.greeting = (By.TAG_NAME, 'h1')
        self.username = (By.TAG_NAME, 'p')
        self.accounts = (By.CLASS_NAME, 'accounts')

    def check_greeting(self, expected_greeting: str):
        print("Checking greeting")
        greeting = self.wait.until(EC.visibility_of_element_located(self.greeting))
        greeting_text = greeting.text
        pattern = r"^Hola [A-Za-záéíóúñÑ]+$"
        assert re.match(pattern, greeting_text), f"No se muestra el saludo esperado. Se esperaba {expected_greeting} y se obtuvo {greeting_text}"

    def check_username(self, expected_username: str):
        print("Checking username")
        username = self.wait.until(EC.visibility_of_element_located(self.username))
        assert username.text == expected_username, f"No se muestra el nombre de usuario esperado. Se esperaba {expected_username} y se obtuvo {username.text}"
        return self
    
    def check_accounts(self):
        print("Checking accounts")
        accounts = self.wait.until(EC.visibility_of_element_located(self.accounts))
        assert accounts.is_displayed(), "Accounts section is not displayed"
        return self
    

from selenium import webdriver
from accounts_test import Accounts
from selenium.webdriver.chrome.service import Service

def run_tests():
    service = Service("/usr/bin/chromedriver")
    driver = webdriver.Chrome(service=service)
    driver.get("http://localhost:4200/accounts-list")

    accounts_test = Accounts(driver)

    accounts_test.check_accounts()
    accounts_test.check_greeting("Hola Humberto")
    accounts_test.check_username("Humberto Gonzalez")

    driver.quit()

if __name__ == "__main__":
    run_tests()