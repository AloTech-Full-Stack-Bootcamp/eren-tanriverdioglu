from random import randrange

def random_number_generator(n, l=6):

    # Set range based on inputs
    start = 10**(l-1)
    end = 10**l

    # Store generated numbers in a list to prevent duplicates
    generated_numbers = set()

    # Generate, check, append and yield the number
    while len(generated_numbers) < n:
        number = randrange(start, end)
        if number in generated_numbers:
            continue
        generated_numbers.add(number)
        yield number
