# Duo setup candidate

`../.gitlab/duo/growth.yaml` is a custom flow YAML candidate checked against the official v1 registry structure on 2026-10-07. It is **not installed or server-validated**. The files do not auto-register a GitLab flow. An authenticated Maintainer must validate/create it in the target project's AI > Flows interface and enable the appropriate trigger. Target-version tools and execution permissions still need verification.

Start with Assign (Issue assignment to flow identity) instead of inventing label YAML. The prompt handles `context:goal` and `context:project_id`. Run one fresh, human-created Issue. Confirm a plan, branch, code mutation, meaningful test and normal MR are produced. Observe session/tool errors before retry; do not repeatedly restart unchanged failures. Leave merge/release/deploy disabled until explicit production approval and verified CI exist.

Runner setup must provide Node 22+, npm dependencies and headless Chromium; a network-restricted flow cannot install them by assumption. HTTP API credentials must already be available through GitLab's supported execution identity, never embedded in YAML or committed. A flow using run_command is powerful: review its project-scoped authority before enablement.

Sources: [custom flows](https://docs.gitlab.com/user/duo_agent_platform/flows/custom/), [custom flow schema](https://docs.gitlab.com/user/duo_agent_platform/flows/custom_flows_schema/), [v1 registry](https://gitlab.com/gitlab-org/modelops/applied-ml/code-suggestions/ai-assist/-/blob/main/docs/flow_registry/v1.md), [triggers](https://docs.gitlab.com/user/duo_agent_platform/triggers/).
