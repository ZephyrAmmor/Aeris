LR Means Left to Right, TD means Top to Down, graph for flowCharts
`{}` give diamond, decision shape, `[]` rectangle, `()`, rounded, `[//]`
gives parallelogram, `(())` gives circle, `> ]` asymmetric shape
```mermaid
    graph LR
        A[Start] -->B{Is it sunny?}
        B -- Yes -->C[Go Outside]
        C -- No -->D[Stay Inside]
        C -->E(Enjoy the day)
        D -->E
```
```mermaid
    graph LR
        A[Rectangle] -->B(Rounded)
        B -->C{decision}
        C -- Yes --> D((Circle))
        C -- No --> E[/Parallelogram/]
```

```mermaid
    graph LR
        A[Rectangle / Process] -->B(Rounded / Terminator)
        B -->C{Decision /Diamond}
        C -->D((Circle / Connector))
        D -->E[/Parallelogram/ Input-Output/]
        E -->F>Asymmetric / Manual operation]
```

```mermaid
    graph LR
        A(Start) -->B{if x > 0}
        B -- Yes -->C[Positive]
        B -- No -->D[Negative Or Zero]
        D -->E[End]
        C -->E
```

```mermaid
    graph LR
        A(Start) -->B{if x > 0}
        B -- Yes -->C[Do it]
        C -->B
        B -- No -->D[End]
```

```mermaid
    graph LR
        A(Start) -->B{if x = 1}
        B -- Yes -->C[Print 1]
        B -- No -->E{else if x = 2}
        E -- Yes -->F[Print 2]
        E -- No -->G{else if x = 3}
        G -- Yes -->H[Print 3]
        H -- No -->I(End)

```