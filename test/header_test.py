from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webdriver import WebDriver

class Header:
    def __init__(self, driver: WebDriver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)
        self.title = (By.CLASS_NAME, 'navbar-brand')
        self.accounts_link = (By.LINK_TEXT, 'Cuentas')
        self.movements_link = (By.LINK_TEXT, 'Movimientos')
        self.investments_link = (By.LINK_TEXT, 'Inversiones')

    def check_title(self, expected_title: str):
        print("Checking title")
        title = self.driver.find_element(*self.title)
        assert title.text == expected_title, f"No se muestra el título esperado. Se esperaba {expected_title} y se obtuvo {title.text}"
        return self
    
    def check_accounts_link(self):
        print("Checking accounts link")
        accounts_link = self.driver.find_element(*self.accounts_link)
        assert accounts_link.is_displayed(), "Accounts link is not displayed"
        return self
    
    def check_movements_link(self):
        print("Checking movements link")
        movements_link = self.driver.find_element(*self.movements_link)
        assert movements_link.is_displayed(), "Movements link is not displayed"
        return self
    
    def check_investments_link(self):
        print("Checking investments link")
        investments_link = self.driver.find_element(*self.investments_link)
        assert investments_link.is_displayed(), "Investments link is not displayed"
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