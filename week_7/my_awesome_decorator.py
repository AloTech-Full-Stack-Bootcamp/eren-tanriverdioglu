def my_awesome_decorator(fun):
    def wrapped(*args):
        # Increse all given numbers by 1
        # Return True if False, else False
        return not fun(*[x+1 for x in args])
    return wrapped

@my_awesome_decorator
def mod_batch(*numbers):
    # Return True if all given numbers can be divided with 3, else False
    return all([True if number % 3 == 0 else False for number in numbers])
