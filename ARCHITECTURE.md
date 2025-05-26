# Jarvis Architecture

This document outlines the architectural design of Jarvis, an app for interacting with a personal knowledge base.

## Repository Layout

Jarvis's repository is organized into two primary sections:

1. **Codebase**
   - `/src`: Application source code
   - `/frontend`: User interface components
   - `/backend`: Server-side logic
   - `/api`: API definitions and endpoints
   - `/utils`: Shared utility functions
   - `/tests`: Test suites

2. **Knowledge Base**
   - `/knowledge`: Root directory for all knowledge content
   - `/knowledge/projects`: Current projects with clear goals and deadlines
   - `/knowledge/areas`: Areas of responsibility requiring ongoing attention
   - `/knowledge/resources`: Topic-related resources and references
   - `/knowledge/archive`: Inactive projects and deprecated information

## Jarvis Persona System

Jarvis is a context-aware assistant designed to manage and interact with the user's knowledge base.

### Core Components

```
┌──────────────────┐      ┌─────────────────┐      ┌────────────────────┐
│  User Interface  │◄────►│  Jarvis Engine  │◄────►│  Knowledge Base    │
│  (Text/Voice)    │      │  (AI Core)      │      │  (PARA Structure)  │
└──────────────────┘      └─────────────────┘      └────────────────────┘
                                  ▲                         ▲
                                  │                         │
                                  ▼                         │
                           ┌─────────────────┐             │
                           │  Context Engine │             │
                           │  & Embeddings   │◄────────────┘
                           └─────────────────┘
```

### Context Awareness

The context engine tracks and analyzes:
- Current user activity and focus
- Recently accessed information
- Time-based relevance
- Project relationships
- Personal preferences and patterns

This enables Jarvis to provide information relevant to the user's current needs without requiring explicit queries.

### Knowledge Base Updating Flow

```
┌──────────────┐     ┌───────────────┐     ┌───────────────┐     ┌────────────────┐
│ User Input   │────►│ Content       │────►│ PARA          │────►│ Storage &      │
│ Detection    │     │ Analysis      │     │ Classification │     │ Indexing       │
└──────────────┘     └───────────────┘     └───────────────┘     └────────────────┘
```

1. **Detection**: Jarvis identifies new information from user interactions.
2. **Analysis**: The content is analyzed for key concepts, entities, and relationships.
3. **Classification**: New content is assigned to appropriate PARA categories.
4. **Storage**: Content is stored in the knowledge base with proper metadata.
5. **Indexing**: Content is indexed for future retrieval.

## PARA Method Structure

The knowledge base is organized using the PARA method:

1. **Projects**: Contains active projects with defined outcomes and deadlines.
   - Each project has its dedicated space with tasks, notes, references, and deadlines.
   - Project status is tracked and updated regularly.

2. **Areas**: Represents responsibilities requiring ongoing maintenance.
   - Personal development, health, finances, relationships, etc.
   - Contains standards, routines, and metrics for each area.

3. **Resources**: Topic-specific reference materials and information.
   - Organized by subject matter (e.g., programming languages, cooking recipes).
   - Includes articles, books, videos, courses, and other resources.

4. **Archives**: Inactive and completed items from other categories.
   - Completed projects, outdated resources, and reference materials.
   - Preserved for historical reference but not actively maintained.

## Embedding/Indexing Workflow

When not actively engaged with the user, Jarvis performs background processing:

1. **Content Processing**
   - New content is split into appropriate chunks
   - Metadata extraction (dates, entities, topics)
   - Relationship mapping between content pieces

2. **Embedding Generation**
   - Vector embeddings are created for each content chunk
   - Embeddings capture semantic meaning for similarity searches
   - Multiple embedding models may be used for different content types

3. **Index Updating**
   - Vector database updates with new embeddings
   - Metadata index updates for structured queries
   - Cross-references between related content are established

4. **Optimization**
   - Periodically rebalance indexes for query performance
   - Consolidate similar or redundant information
   - Update relevance scores based on usage patterns

## Interaction Modes

Jarvis supports two primary interaction modes:

### Text Interaction
- Chat interface for direct queries and commands
- Markdown support for structured content
- Code highlighting for technical knowledge
- Contextual suggestions based on current activity

### Voice Interaction
- Speech recognition for hands-free operation
- Natural language processing for conversational interface
- Voice synthesis for spoken responses
- Background listening mode for contextual assistance
- Voice authentication for security