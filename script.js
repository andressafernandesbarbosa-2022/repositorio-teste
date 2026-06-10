// ==========================================================================
// CONFIGURAÇÕES DE DADOS (ARRAY DE OBJETOS)
// ==========================================================================

const SOLUCOES_DATA = [
    {
        titulo: "Agricultura de Precisão",
        descricao: "Mapeamento via satélite e drones que analisam a saúde da cultura em tempo real, permitindo aplicação de insumos cirúrgica e sem desperdícios.",
        detalhe: "Redução de custos com defensivos agrícolas."
    },
    {
        titulo: "Manejo Inteligente de Carbono",
        descricao: "Plataforma completa para medir, certificar e comercializar créditos de carbono gerados pela sua atividade agrícola.",
        detalhe: "Transforme preservação em receita direta."
    },
    {
        titulo: "Gestão Hídrica Conectada",
        descricao: "Sensores de umidade de solo integrados com telemetria climática para programar irrigações com exatidão milimétrica.",
        detalhe: "Economia real do recurso mais precioso."
    }
];

const FAQ_DATA = [
    {
        pergunta: "Como a sustentabilidade pode aumentar meu lucro prático?",
        resposta: "Práticas sustentáveis reduzem o desperdício de insumos, melhoram a resiliência do solo a secas e pragas e qualificam sua produção para mercados de exportação que pagam prêmios substanciais por produtos certificados."
    },
    {
        pergunta: "Preciso mudar toda a minha infraestrutura de uma vez?",
        resposta: "Não. Nosso método opera em fases. Começamos pelo diagnóstico e aplicamos tecnologias modulares que se adaptam ao maquinário e processos que você já utiliza na sua fazenda."
    },
    {
        pergunta: "O diagnóstico gratuito me compromete a algo?",
        resposta: "Absolutamente nenhum compromisso. O diagnóstico serve para avaliar o cenário atual da sua propriedade e apresentar as oportunidades de otimização viáveis."
    }
];

// ==========================================================================
// INICIALIZAÇÃO DE COMPONENTES
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    renderCarousel();
    renderAccordion();
    initAccessibility();
    initCarouselLogic();
    initFormSubmit();
});

// Renderizador do Carrossel
function renderCarousel() {
    const track = document.getElementById("carousel-track");
    if (!track) return;

    track.innerHTML = SOLUCOES_DATA.map(item => `
        <div class="carousel-item">
            <div class="carousel-content">
                <div>
                    <h3>${item.titulo}</h3>
                    <p>${item.descricao}</p>
                </div>
                <div>
                    <div style="background: var(--primary-color); padding: 2rem; border-radius: 8px; color: white; font-weight: bold; text-align: center;">
                        ${item.detalhe}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Renderizador do Acordeão (FAQ)
function renderAccordion() {
    const accordionContainer = document.getElementById("faq-accordion");
    if (!accordionContainer) return;

    accordionContainer.innerHTML = FAQ_DATA.map((item, index) => `
        <div class="accordion-item">
            <button class="accordion-header" data-index="${index}">
                ${item.pergunta}
                <span class="icon-toggle">▼</span>
            </button>
            <div class="accordion-content">
                <p>${item.resposta}</p>
            </div>
        </div>
    `).join('');

    // Lógica de ativação do acordeão
    const headers = accordionContainer.querySelectorAll(".accordion-header");
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const content = item.querySelector(".accordion-content");
            const isOpen = item.classList.contains("active");

            // Fecha todos antes de abrir o atual
            document.querySelectorAll(".accordion-item").forEach(i => {
                i.classList.remove("active");
                i.querySelector(".accordion-content").style.maxHeight = null;
            });

            if (!isOpen) {
                item.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

// Lógica de Navegação do Carrossel
function initCarouselLogic() {
    const track = document.getElementById("carousel-track");
    const nextBtn = document.getElementById("carousel-next");
    const prevBtn = document.getElementById("carousel-prev");
    if (!track || !nextBtn || !prevBtn) return;

    let currentIndex = 0;

    nextBtn.addEventListener("click", () => {
        if (currentIndex < SOLUCOES_DATA.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = SOLUCOES_DATA.length - 1;
        }
        updateCarousel();
    });

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
}

// ==========================================================================
// ACESSIBILIDADE (FONTE E CONTRASTE)
// ==========================================================================

function initAccessibility() {
    const btnContrast = document.getElementById("btn-contrast");
    const btnFontIncrease = document.getElementById("btn-font-increase");
    const btnFontDecrease = document.getElementById("btn-font-decrease");

    // Alternador de Contraste
    if (btnContrast) {
        btnContrast.addEventListener("click", () => {
            document.body.classList.toggle("high-contrast");
        });
    }

    // Controle de Tamanho de Fonte
    let currentFontSize = 16; 

    function changeFontSize(action) {
        if (action === 'increase' && currentFontSize < 24) {
            currentFontSize += 2;
        } else if (action === 'decrease' && currentFontSize > 12) {
            currentFontSize -= 2;
        }
        document.documentElement.style.fontSize = `${currentFontSize}px`;
    }

    if (btnFontIncrease) {
        btnFontIncrease.addEventListener("click", () => changeFontSize('increase'));
    }
    if (btnFontDecrease) {
        btnFontDecrease.addEventListener("click", () => changeFontSize('decrease'));
    }
}

// Validação e Envio do Formulário de Leads
function initFormSubmit() {
    const form = document.getElementById("lead-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Obrigado! Seus dados foram enviados com sucesso. Um especialista entrará em contato nas próximas 24 horas.");
        form.reset();
    });
}