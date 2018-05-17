# ADTs, Types, and Type Classes

## What does ADT stand for?

`Algebraic Data Types`

What does algebra have to do with data types??

## Cardinality

Or: how many possible values can a data type represent?

### Why should I care?

Because Cardinality can be thought of as a measure of the Complexity of a type.

There are two classes of data types: Sum (a.k.a. Union) types, and Product types.

Example Sum type:
```
Boolean = False | True
```

Example Product type:
```
Vehicle = Bike maker engineSize | Car maker engineSize numDoors | Bus maker numSeats
```

## I'll Ask Again: Why should I care?

Because the shape of a Sum type is defined for the type (Boolean) not the data (False, True).
This is not to say that the behaviour is the same, only the shape is similar. True, though, is that
this is more interesting in a strongly typed language.

Let's use a classic Sum type as an example:
```
Maybe = Nothing | Just a
```

Think of a simple box: it might contain something, or it might be empty. It still looks and feels
like a box. You may open it, close it, etc.
_You took some possible value, and put some structure around it_. The structure is always there,
even though the value itself might not. This is why these types are called Union types (think of a
C union).

## OK, Cool, What else?

Remember how a Union type is a collection of data that share the same _shape_?
Meet _Type Classes_ - the shapes that are shared across _different Types_.

Example:
```javascript
[1, 2, 3].map(x => x + 1)
// => [2, 3, 4]

Just(1).map(x => x + 1)
// => Just(2)

Nothing.map(x => x + 1)
// => Nothing
```
