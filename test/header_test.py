from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webdriver import WebDriver

RED = '\033[31m'
GREEN = '\033[32m'
RESET = '\033[0m' 

class Header:
    def __init__(self, driver: WebDriver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)
        self.title = (By.CLASS_NAME, 'navbar-brand')
        self.accounts_link = (By.LINK_TEXT, 'Cuentas')
        self.movements_link = (By.LINK_TEXT, 'Movimientos')
        self.investments_link = (By.LINK_TEXT, 'Inversiones')

    def check_title(self, expected_title: str):
        title = self.driver.find_element(*self.title)
        assert title.text == expected_title, f"{RED}No se muestra el título esperado. Se esperaba \"{expected_title}\" y se obtuvo \"{title.text}\" ✗{RESET}"
        print(f"{GREEN}Title is correct ✓{RESET}")
        return self
    
    def check_accounts_link(self):
        accounts_link = self.driver.find_element(*self.accounts_link)
        assert accounts_link.is_displayed(), f"{RED}Accounts link is not displayed ✗{RESET}"
        print(f"{GREEN}Accounts link is displayed ✓{RESET}")
        return self
    
    def check_movements_link(self):
        movements_link = self.driver.find_element(*self.movements_link)
        assert movements_link.is_displayed(), f"{RED}Movements link is not displayed ✗{RESET}"
        print(f"{GREEN}Movements link is displayed ✓{RESET}")
        return self
    
    def check_investments_link(self):
        investments_link = self.driver.find_element(*self.investments_link)
        assert investments_link.is_displayed(), f"{RED}Investments link is not displayed ✗{RESET}"
        print(f"{GREEN}Investments link is displayed ✓{RESET}")
        return self
        
from selenium import webdriver
from header_test import Header
from selenium.webdriver.chrome.service import Service

def run_tests():
    service = Service("/usr/bin/chromedriver")
    driver = webdriver.Chrome(service=service)
    driver.get("http://localhost:4200/")

    header_test = Header(driver)

    header_test.check_title("Banca por internet")
    header_test.check_accounts_link()
    header_test.check_movements_link()
    header_test.check_investments_link()

    driver.quit()

if __name__ == "__main__":
    run_tests()