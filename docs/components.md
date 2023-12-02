```mermaid
---
title: components
---
%%{init:{'theme':'forest'}}%%
flowchart TB
    Home-->Select
    Home-->Profile
    Profile-->Home
    Select-->Game
    Game-->Result
    Result-->Home
    subgraph Home
    a1-->a2
    end
    subgraph Select
    b1-->b2
    end
    subgraph Game
    c1-->c2
    end
    subgraph Result
    c1-->c2
    end
    subgraph Profile
    c1-->c2
    end
```