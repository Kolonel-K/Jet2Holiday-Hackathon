import pygame
import random
import sys

# Initialize pygame
pygame.init()

# Window settings
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Mini Fruit Ninja")

# Load fruit image (replace 'fruit.png' with your PNG file path)
fruit_img = pygame.image.load("C:\\Users\\anhad\\OneDrive\\Documents\\HGL - Copy\\1st Sem USYD\\hackathon 6-9-2025\\trash.png")
fruit_img = pygame.transform.scale(fruit_img, (100, 100))  # resize

# Colors
WHITE = (255, 255, 255)

# Fruit class
class Fruit:
    def __init__(self):
        self.x = random.randint(50, WIDTH - 150)
        self.y = random.randint(50, HEIGHT - 150)
        self.rect = fruit_img.get_rect(topleft=(self.x, self.y))

    def draw(self):
        screen.blit(fruit_img, (self.x, self.y))

# Game variables
fruits = [Fruit()]
score = 0
font = pygame.font.SysFont(None, 40)

# Main loop
clock = pygame.time.Clock()
while True:
    screen.fill(WHITE)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

        if event.type == pygame.MOUSEBUTTONDOWN:
            mouse_pos = pygame.mouse.get_pos()
            for fruit in fruits[:]:
                if fruit.rect.collidepoint(mouse_pos):
                    fruits.remove(fruit)
                    fruits.append(Fruit())  # spawn new fruit
                    score += 1

    # Draw fruits
    for fruit in fruits:
        fruit.draw()

    # Display score
    score_text = font.render(f"Score: {score}", True, (0, 0, 0))
    screen.blit(score_text, (10, 10))

    pygame.display.flip()
    clock.tick(30)
